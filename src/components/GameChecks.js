import React, {useState, useEffect} from 'react';
import { s3accountStats } from '../constants/Constants';
import { Storage } from 'aws-amplify';

export const CheckRace = async (accountId, nfts = {}) => {
  const nftsObject = JSON.parse(nfts);
  let heldRaces = [];
  
  // Get the user's held races from their NFTs
  for (const nft of nftsObject.nftMetadata) {
    // If the race isn't already included and the "type" field doesn't exist
    if (!heldRaces.includes(nft.race)) {
      heldRaces.push(nft.race);
    }
  }

  return { heldRaces };
}


export const CheckChapter = async (accountId, race) => {
  const signedUrl = await Storage.get(`${s3accountStats}/accounts.csv`, { level: "public" });
  const response = await fetch(signedUrl);
  const textContent = await response.text();

  const rows = textContent.trim().split("\n");
  const header = rows.shift().split("|");

  // filter rows based on accountId
  const filteredRows = rows.filter(row => {
    const rowItems = row.split("|");
    return rowItems[0] === accountId;
  });

  const chapters = ['Chapter 1-1', 'Chapter 1-2', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'];
  //const availableChapters = ['Chapter 1-1', 'Chapter 1-2', 'Chapter 2', 'Chapter 3']
  const availableChapters = ['Chapter 1-1']

  let accessibleChapters = chapters.map(chapter => ({
    chapter,
    status: chapter === 'Chapter 1-1' ? 'Open' : 'Locked', // "Chapter 1-1" is always open.
  }));

  // Process each filtered row
  for (const row of filteredRows) {
    const [id, action, raceInRow, nft, datetime] = row.split("|");
  
    // If a chapter was completed
    if (action.includes('Completed')) {
      const completedChapter = action.replace(' Completed', '');
  
      // If chapter is not the last in the list, update the status of the next chapter to accessible chapters
      const chapterIndex = chapters.indexOf(completedChapter);
      if (chapterIndex !== -1 && chapterIndex < chapters.length - 1) {
        const nextChapterIndex = chapterIndex + 1;
        const nextChapter = chapters[nextChapterIndex];
  
        // Check race condition for non-universal chapters
        if ((['Chapter 3', 'Chapter 4', 'Chapter 5'].includes(nextChapter) && race === raceInRow) || 
            ['Chapter 1-1', 'Chapter 1-2', 'Chapter 2'].includes(nextChapter)) {
          
          // Mark completed chapter as 'Complete' and open the next chapter.
          accessibleChapters[chapterIndex].status = 'Complete';
          if (accessibleChapters[nextChapterIndex].status === 'Locked') {
            accessibleChapters[nextChapterIndex].status = 'Open';
          }
        }
      }
    }
  }

  // Set chapters not in availableChapters list as 'Locked'
  accessibleChapters.forEach(chapterObj => {
    if (!availableChapters.includes(chapterObj.chapter)) {
      chapterObj.status = 'Locked';
    }
  });
  
  return accessibleChapters;  
}








import React, {useState, useEffect} from 'react';
import { s3accountStats } from '../constants/Constants';
import { Storage } from 'aws-amplify';

export const CheckAccount = async (accountId, nfts ={}) => {
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

  const nftsObject = JSON.parse(nfts);

  const races = ['Mortal', 'Gaian', 'ArchAngel', 'Zephyr', 'Soulweaver', 'Runekin'];
  const chapters = ['Chapter 1-1', 'Chapter 1-2', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'];

  let accessibleChapters = ['Chapter 1-1'];
  let heldRaces = ['Mortal'];
  
  // Get the user's held races from their NFTs
  for (const nft of nftsObject.nftMetadata) {
    if (!heldRaces.includes(nft.race)) {
      heldRaces.push(nft.race);
    }
  }

  // Process each filtered row
  for (const row of filteredRows) {
    const [id, action, race, nft, datetime] = row.split("|");

    // If a chapter was completed
    if (action.includes('Completed')) {
      const completedChapter = action.replace(' Completed', '');

      // If chapter is not the last in the list, add the next chapter to accessible chapters
      const chapterIndex = chapters.indexOf(completedChapter);
      if (chapterIndex !== -1 && chapterIndex < chapters.length - 1) {
        const nextChapter = chapters[chapterIndex + 1];
        const nextChapterRace = nextChapter === 'Chapter 1-2' ? 'Mortal' : races[chapterIndex-1];
        
        // Add the next chapter to accessible chapters only if player holds the required race
        if (heldRaces.includes(nextChapterRace) && !accessibleChapters.includes(nextChapter)) {
          accessibleChapters.push(nextChapter);
        }
      }
    }
  }
  
  console.log(accessibleChapters)
  console.log(heldRaces)
  return { accessibleChapters, heldRaces };
}






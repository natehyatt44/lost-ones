import Amplify from '@aws-amplify/core';

export function configureAmplify() {
  Amplify.configure(
  {
   Auth: {
     identityPoolId: "us-east-1:ba3f1d2d-880b-490d-aa2b-1cf90e26ec7f",
     region: "us-east-1"
    },
  Storage: { 
     bucket: "lost-ones-upload32737-staging",
     region: "us-east-1",
     identityPoolId: "us-east-1:ba3f1d2d-880b-490d-aa2b-1cf90e26ec7f"
    }
  }
 );
} 
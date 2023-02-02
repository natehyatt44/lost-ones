import { Storage } from "@aws-amplify/storage"

Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
        .then(result => console.log(result))
        .catch(err => console.log(err));
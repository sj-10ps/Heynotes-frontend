import 'dotenv/config'

export default {
  expo: {
    name: "HeyNotes",
    slug: "HeyNotes",
    version: "1.0.0",
     android: {
    package: "com.yourname.heynotes"
  },
    extra: {
      API_URL: process.env.API_URL, 
      eas: {
      projectId: "d870c804-c13f-4bd5-ae5a-89d0d94a4290"
    }
    },
  },
};

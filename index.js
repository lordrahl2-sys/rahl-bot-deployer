// index.js
import { db } from "./firebase-config.js";
import { onSnapshot, collection } from "firebase-admin/firestore";
import { exec } from "child_process";

console.log("🟢 Rahl Deployer started");

const deployRef = collection(db, "deploy_requests");

onSnapshot(deployRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const data = change.doc.data();
      console.log(`🧠 New Deploy Request: ${data.BOT_NAME}`);

      // Simulated deploy (replace this with actual clone + config later)
      exec(
        `echo "Deploying ${data.BOT_NAME} with session ${data.SESSION_ID}"`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(`❌ Deploy error: ${err}`);
            return;
          }
          console.log(`✅ Deployed bot: ${data.BOT_NAME}`);
        }
      );
    }
  });
});

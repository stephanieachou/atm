import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

const dataPath = path.join("server", "data", "users.json");

let userData = {};
try {
  const fileData = fs.readFileSync(dataPath, "utf-8");
  const { users } = JSON.parse(fileData);
  const today = new Date().toLocaleDateString("en-CA");
  userData = {
    users: users.map((user) => ({
      ...user,
      ...(new Date(today) > new Date(user.lastWithdrawalDate) && {
        dailyWithdrawalTotal: 0,
      }),
    })),
  };
} catch (err) {
  console.error("Error loading users list", err);
}

app.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = userData.users.find((item) => item.id === id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update existing user
app.put("/api/user/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { action, amount } = req.body;
    const index = userData.users.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userData.users[index];
    if (action === "withdrawal") {
      const today = new Date().toLocaleDateString("en-CA");
      if (user.lastWithdrawalDate !== today) {
        user.lastWithdrawalDate = today;
      }
      user.dailyWithdrawalTotal += amount;
      user.currentBalance -= amount;
    } else if (action === "deposit") {
      user.currentBalance += amount;
    }

    userData.users[index] = user;
    fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => console.log(`Listening on port ${8000}`));

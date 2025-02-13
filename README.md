# 🤖 Discord Bot - Powerful & Easy to Use

Welcome to the **Discord Bot**! 🚀 This bot is designed to manage your server with **admin tools**, **moderation commands**, and **useful utilities**.

## 📌 Features

✨ **Admin Commands** - Ban, kick, lock/unlock channels, and more!  
👥 **User Info & Server Info** - Get insights about members and servers.  
⚡ **Slash Commands** - Easy-to-use Discord slash commands.  
🎯 **Event Handling** - Reacts to interactions and events efficiently.  

## 🛠 Installation & Setup

### 1️⃣ Install Dependencies

Make sure you have **Node.js** installed. Then run:

```sh
npm install
```

### 2️⃣ Configure `.env`

Create a `.env` file in the root directory and add:

```env
TOKEN=your_discord_bot_token
```

### 3️⃣ Start the Bot

Run the bot using:

```sh
node index.js
```

## 📂 Project Structure

```
📁 bot
 ├── 📜 index.js            # Main bot file
 ├── 📜 package.json        # Project dependencies
 ├── 📁 commands            # Contains bot commands
 │   ├── 📁 admin           # Admin-related commands
 │   ├── 📁 public          # Public commands
 ├── 📁 events              # Event handling
 ├── 📁 handler             # Manages commands & events
 ├── 📜 .env                # Environment variables
```

## 🚀 Commands

| Command | Description |
|---------|------------|
| `/ban @user` | Bans a user from the server |
| `/unban @user` | Unbans a previously banned user |
| `/lock #channel` | Locks a channel |
| `/unlock #channel` | Unlocks a channel |
| `/clear 10` | Deletes the last 10 messages |
| `/server-info` | Shows server information |
| `/user-info @user` | Displays user details |

## 📌 Contributing

Want to improve the bot? Feel free to submit a **pull request** or report issues! 🚀

## 📜 License

This project is licensed under the **MIT License**.

---

🎉 **Enjoy using your new Discord bot!** If you like it, give it a ⭐!

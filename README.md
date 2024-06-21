# ai-hackathon-2024

On Windows Subsystem Linux 2 w/ Ubunto 22.04, or on Ubuntu 22.04, or in a mac (ignore the installation of curl).

Run:

```
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
cd ../
npm install concurrently
npm run dev
```
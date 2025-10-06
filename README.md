# SFU-Parking-Website
A website that finds other SFU students you can share a parking pass with

## Installation and Setup

``` bash
# Clone the repo

git clone git@github.com:JamesChuong/SFU-Parking-Website.git

cd SFU-Parking-Website
```

#### Environment Variables setup
In the root directory, create a file called `.env`, this will store all the environment variables
the app needs

```
DB_PASSWORD=<your_password>
DB_USER=<your_username>
DJANGO_SECRET_KEY=<your_key>
```

### Backend setup

##### Create virtual environment (Recommended for development)
```bash
python -m venv <venv_name>
```
#### Activate the virtual environment (Linux/MacOS)

```bash
source <venv_name>/bin/activate
```

#### Activate the virtual environment (Windows)
```bash
<venv_name>/Scripts/Activate
```

#### Install Python dependencies
```bash
cd server/
pip install -r requirements.txt
```

#### Run the backend (Docker)
```bash
# Must be the root directory
docker compose up
```
> In case of port number conflicts, locate the app currently using the port and disable it
> #### Linux
> ```bash
> sudo lsof -i :<port>  # Locate the app currently using the port number
> sudo systemctl stop <pid>   # Temporarily disable the app
> ```

# SFU Parking Website
A website that finds other SFU students you can share a parking pass with

### Tech Stack

<details>
<summary> Expand </summary>

#### Frontend:

* React + Vite
* TailwindCSS
* React Redux
* Axios
* React Router

#### Backend:

* Django
* Redis
* Celery

#### Database:

* MySQL

#### Containerization:
* Docker

#### APIs Used:

* SFU Course Outlines API

</details>

## Installation and Setup

``` bash
# Clone the repo

git clone git@github.com:JamesChuong/SFU-Parking-Website.git

cd SFU-Parking-Website
```

<details>

<summary> Backend Setup </summary>

#### Environment Variables setup
In the root directory, create a file called `.env`, this will store all the environment variables
the app needs

```
DB_USER=
DB_PASSWORD=
DJANGO_SECRET_KEY=
DB_NAME=
DB_ROOT_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
CELERY_SECRET_KEY=
ALLOWED_HOSTS=localhost 127.0.0.1 [::1] django
DEBUG=True
TURNSTILE_SECRET_KEY= # From Cloudflare Turnstile
EMAIL_HOST=smtp.gmail.com # Uses the Gmail SMTP server
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_USE_SSL=false
EMAIL_HOST_USER= # Your email address
EMAIL_HOST_PASSWORD= # Gmail app password registered on your gmail
```
**Click [here](https://accounts.google.com/v3/signin/challenge/pwd?TL=AHE1sGV9XMilxGRveqbZdvCaL7SpB--e_wOOgCEFHnZmfWNnfU-8JnCid1b-EUtA&authuser=0&cid=4&continue=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&dsh=S1426459969%3A1767562290145522&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&ifkv=Ac2yZaWk9sOhYvQGM5qKILVK1otpvYKcOF6els6DxLnC3H0kvKZmTXXAZdTckdQJCa5x_AiFeEMx&osid=1&rart=ANgoxcdBbGVO3rOtWAtfTDNglOeKdTwFKssCL4bd6b8A8QiKjlexo8z8CDqrGaz5W_MLeGBigGBlsRkUwKSmoZdJu81Qz3jLdRIqsc6p3Ig46UDS2GYtGGM&rpbg=1&service=accountsettings) to set up an app password**
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
#### Set up Cloudflare Turnstile Secret Key**
   - Log in to Cloudflare and go to the Cloudflare Dashboard
   - Navigate to Turnstile on the left-hand sidebar
   - Click **Add site**
   - Configure a site name (Transit Website)
   - Add the domain for which the widget will be used. For local development, use `localhost`.
   - Select the **Managed** widget
   - Click **Create** to obtain your **Site Key** and **Secret Key**.
   - Add the **Secret Key** to your backend `.env` file as `TURNSTILE_SECRET_KEY` (see the next step)
   - The **Site Key** will be used in the frontend `.env` file as `REACT_APP_TURNSTILE_SITE_KEY`. Frontend setup will be explained after the backend setup instructions in this README file.

#### Running the server locally (Optional)
```bash
python manage.py runserver
```

</details>

<details>
<summary> Frontend Setup </summary>

#### NPM and Node.js Setup

Ensure that `Node.js` and `NPM` are installed (I'm currently using Node v20.12.2 and NPM v10.5.0)

The following steps assume you are in the `client/sfu_parking_app` directory
```bash
cd client/
```
#### Install NPM Packages

```bash
npm install
```

</details>

### Once the frontend and backend are set up, you can run the entire app using Docker (Recommended)
```bash
# Must be in the root directory
docker compose up
docker compose up --build # For rebuilding the containers
```
> In case of port number conflicts, locate the app currently using the port and disable it
> #### Linux
> ```bash
> sudo lsof -i :<port>  # Locate the app currently using the port number
> sudo systemctl stop <pid>   # Temporarily disable the app
> ```

### Alternatively, you can run both separately on your local machine

#### Running the server locally (Optional)
**Make migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
```
**Set up Celery Beat and worker node**
   ```bash
   # Requires Redis as a message queue
   redis-server
   
   # Start Celery Beat
   celery -A backend beat -l info
   
   # Start Celery Worker Node
   celery -A backend worker -l info
   ```
**Run server**
```bash
python manage.py runserver
```

#### Run the development server locally (Optional)
```bash
npm run dev
```

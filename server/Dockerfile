FROM python:3.12-bookworm

LABEL authors="James"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

WORKDIR /server

COPY requirements.txt .
RUN pip3 install && pip install -r requirements.txt

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
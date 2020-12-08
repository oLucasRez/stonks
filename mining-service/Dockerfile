FROM python:3.8.5-slim

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

ENTRYPOINT [ "python" ]

CMD ["src/index.py"]

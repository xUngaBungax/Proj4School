FROM python:3.12-slim

RUN apt-get update && \
    apt-get install -y pkg-config build-essential libmariadb-dev default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

COPY ./api/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./api ./api

RUN chmod +x ./api/shell/entrypoint.sh
RUN chmod +x ./api/shell/migrate-mysql.sh

ENTRYPOINT ["./api/shell/entrypoint.sh"]

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
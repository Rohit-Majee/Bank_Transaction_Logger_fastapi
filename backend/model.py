import psycopg2

try:
    conn = psycopg2.connect(
        dbname="bank_db",
        user="postgres",
        password="root",
        host="localhost",
        port="5432"
    )

    print("✅ Connection successful!")

    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()

    print("PostgreSQL version:", db_version)

    cursor.close()
    conn.close()

except Exception as e:
    print("❌ Connection failed:")
    print(e)
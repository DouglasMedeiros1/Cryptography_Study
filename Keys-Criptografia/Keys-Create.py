from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# Gerar chave privada
chave_privada = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)

# Serializar e salvar a chave privada
with open("chave_privada.pem", "wb") as f:
    f.write(chave_privada.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

# Gerar chave pública
chave_publica = chave_privada.public_key()

# Serializar e salvar a chave pública
with open("chave_publica.pem", "wb") as f:
    f.write(chave_publica.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ))

import os
import secrets

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    admin_email = os.getenv("ADMIN_EMAIL", "admin@evently.com")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")

    if (
        data.email.strip().lower() != admin_email.lower()
        or not secrets.compare_digest(data.password, admin_password)
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Simple assessment-friendly access token.
    # For a production application, use JWT/OAuth.
    access_token = os.getenv(
        "ADMIN_TOKEN",
        "evently-admin-token"
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Login successful"
    }
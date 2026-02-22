"""Modelos Pydantic para validación de datos."""

from pydantic import BaseModel


class RSVP(BaseModel):
    name: str
    attendance: str
    companion: str
    transport: str
    allergies: str
    message: str | None = None


class Login(BaseModel):
    username: str
    password: str

class PinUpdate(BaseModel):
    pin: str

class PinVerify(BaseModel):
    pin: str

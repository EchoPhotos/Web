interface Configuration {
  appleMapsToken: string
}

const local: Configuration = {
  appleMapsToken: 'eyJraWQiOiJZNEo4SllaM1k2IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMVlM0VDZQUFo0IiwiaWF0IjoxNzMxNjEwMDE4LCJleHAiOjE3MzIyNjIzOTl9.KPJakkGjaXpN3MkiwODM4R24P4ZiJpLNPf9TZFOfui7I-sCRHuOGUKjFENitVPORvbSs2cyvKnJ-J4Uhel2xiQ',
};

const dev: Configuration = {
  appleMapsToken: 'eyJraWQiOiJZMlE5QktRS0Y5IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMVlM0VDZQUFo0IiwiaWF0IjoxNzMxNjA0NzU5LCJvcmlnaW4iOiIqLndlYi5hcHAifQ.soDsy50mR9B1F8mcmahP-AOH9dHDcPG55hz0Gm0GzoIbULOuuUDU1OX-KRV92eFDsBwFb9exEfrXl-gZKYQxLQ',
};

const prod: Configuration = {
  appleMapsToken: 'eyJraWQiOiI2OVpISjZGTjJCIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMVlM0VDZQUFo0IiwiaWF0IjoxNzMxNjA0NzI1LCJvcmlnaW4iOiIqLmVjaG9waG90b3MuaW8ifQ.v3H9LnnkcFDcD13qzdYvEGuSojafbzuZIDwBEl1HFDWahAbJhyfF5IAUZWVBLcaGnD_XDfyUBkiarRfmESs7Og',
};

function currentConfig() {
  if (process.env.NODE_ENV === "development") {
    return local;
  }
  return prod;
}

const current = currentConfig();
export { current };

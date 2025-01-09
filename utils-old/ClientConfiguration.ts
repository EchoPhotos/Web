'use client'

interface Configuration {
  appleMapsToken: string
}

const local: Configuration = {
  appleMapsToken: 'eyJraWQiOiI5NlpSOVBCODlCIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMVlM0VDZQUFo0IiwiaWF0IjoxNzM0NjQ2Mzc4LCJleHAiOjE3MzUyODYzOTl9.eesKCZgG_8aFhDBdXn6q3p3GmOjTgKD-8K0R82rs3uIxkW8D_aF8l3NwMEboACdkjJiD130qxYHT2FkGfRLwbQ',
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
  } else {
    return prod;
  }
}

const current = currentConfig();
export { current };

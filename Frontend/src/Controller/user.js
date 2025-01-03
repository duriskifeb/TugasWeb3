import { message } from "antd";
import validate from "validate.js";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

// Ganti key localStorage dari "table_user" menjadi "salesDirect"
let localStr = "salesDirect";
export const secretKey = {
  key: "WAOW_telkomUniversitu24",
  name: "LoginedData",
};

let validateFormat = {
  first_name: {
    presence: { allowEmpty: false },
  },
  last_name: {
    presence: { allowEmpty: false },
  },
  phone_number: {
    presence: { allowEmpty: false },
    format: {
      pattern: "^(\\+62|62|0)[2-9]{1}[0-9]{7,11}$",
      message: "wrong phone number format",
    },
  },
  image: {
    presence: { allowEmpty: false },
    url: true,
  },
  email: {
    presence: { allowEmpty: false },
    email: { message: "Invalid email format" },
  },
  password: {
    presence: { allowEmpty: false },
    length: { minimum: 8 },
  },
};

export function RegisterController(data) {
  let error = validate(data, {
    first_name: validateFormat.first_name,
    last_name: validateFormat.last_name,
    phone_number: validateFormat.phone_number,
    email: validateFormat.email,
    password: validateFormat.password,
  });

  if (error) {
    message.error("Failed to Register Account");
    return {
      status: false,
      error: error,
    };
  } else {
    let get = JSON.parse(localStorage.getItem(localStr)) ?? [];

    console.log(get);

    let emailUniq = get.filter((user) => user.email === data.email).length;
    let phone_numberUniq = get.filter(
      (user) => user.phone_number === data.phone_number
    ).length;

    if (emailUniq > 0 || phone_numberUniq > 0) {
      message.error("Failed to Register Account");
      return {
        status: false,
        error: {
          email: emailUniq > 0 && ["Email has been registered"],
          phone_number: phone_numberUniq > 0 && [
            "Phone number has been registered",
          ],
        },
      };
    }

    get.push({
      id: get.length + 1,
      profile: null,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
      role: get.length == 0 ? "admin" : "user",
    });
    localStorage.setItem(localStr, JSON.stringify(get));

    message.success("Successfully register please login");
    return {
      status: true,
    };
  }
}

export function LoginController(data) {
  let error = validate(data, {
    email: validateFormat.email,
    password: validateFormat.password,
  });

  let get = JSON.parse(localStorage.getItem(localStr)) ?? [];
  let dataList = get.filter(
    (user) => user.email === data.email && user.password === data.password
  );

  if (error) {
    message.error("Failed Login, make sure username and password are correct");
    return {
      status: false,
      error: error,
    };
  } else if (dataList.length > 0) {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(dataList[0].id),
      secretKey.key
    ).toString();
    if (data.remember) {
      Cookies.set(secretKey.name, encryptedData, { expires: 7 });
    } else {
      sessionStorage.setItem(secretKey.name, encryptedData);
    }

    message.success("Login successfully");

    return {
      status: true,
    };
  } else {
    message.error("Failed Login, make sure username and password are correct");
    return {
      status: false,
      error: {
        email: "Incorrect username or password",
      },
    };
  }
}

export default function LogoutController(navigate) {
  Cookies.remove(secretKey.name);
  sessionStorage.removeItem(secretKey.name);
  navigate("/login");
}

export function GuestController(navigate) {
  if (
    sessionStorage.getItem(secretKey.name) != null ||
    Cookies.get(secretKey.name) != null
  ) {
    navigate("/");
  }
}

export function AuthController(navigate, role = true) {
  let get = JSON.parse(localStorage.getItem(localStr)) ?? [];

  if (sessionStorage.getItem(secretKey.name) || Cookies.get(secretKey.name)) {
    let fet =
      sessionStorage.getItem(secretKey.name) ?? Cookies.get(secretKey.name);
    const bytes = CryptoJS.AES.decrypt(fet, secretKey.key);
    let id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return get.filter((user) => user.id === id)[0];
  } else {
    navigate("/login");
  }
}

export function UpdateProfileController(data) {
  let error = validate(data, {
    image: validateFormat.image,
  });

  if (error) {
    message.error("Failed to update data");
    return {
      status: false,
      error: error,
    };
  } else {
    let get = JSON.parse(localStorage.getItem(localStr)) ?? [];

    let Auth = AuthController();

    get = get.map((item) => {
      if (item.id === Auth.id) {
        item.profile = data.image; // Update profile
      }
      return item;
    });

    localStorage.setItem(localStr, JSON.stringify(get));

    message.success("Success to update data");
    location.reload();
  }
}

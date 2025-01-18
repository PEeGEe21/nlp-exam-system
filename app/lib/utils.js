'use client';

// import { redirect, useRouter } from 'next/navigation';
import { clsx } from "clsx"
import * as dayjs from 'dayjs';
import moment from 'moment';
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { successtoastOptions } from './constants';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


const isWindowDefined = typeof window !== 'undefined';

// export const hostUrl = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV :  process.env.NODE_ENV ;
// console.log(process.env.NODE_ENV, process.env.NEXT_PUBLIC_AUTH_URL, process.env.NEXT_PUBLIC_LOCAL_AUTH_URL, process.env.NEXT_PUBLIC_AUTH_URL)
export const hostUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL_AUTH_URL :  process.env.NEXT_PUBLIC_AUTH_URL ;
// console.log(process.env.NEXT_PUBLIC_NODE_ENV, hostUrl)
const examsUrl = hostUrl + 'tests/';
const questionsUrl = hostUrl + 'questions/';


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



export const _getData = async (uri) => {
  const response = await fetch(uri);
  if (response.status === 200) {
    return response.json();
  } else {
    return false;
  }
};

export const fetchProjectsByUserId = async (user_id, page) => {
  // console.log(`${hostUrl}/api/projects/` + uri + '/projects', 'url');
  // return
  const url = user_id + '/user-projects' + '?page='+ page + '&limit=12';
  console.log(url, 'url')
  const response = await axios.get(`${hostUrl}/api/projects/` + url);
  console.log(response, 'resp');
  if (response && response.data && response.data.success) {
    return response.data;
  } else {
    return null;
  }
};

// Question
export const addQuestionToExam = async (test_id, question, payload) => {
  const response = await axios.post(
    `${examsUrl}add-question-to-test/${test_id}/${question.id}`,
    payload
  );
  return response;
};

export const getProjectTasks = async (projectId) => {
  let url = `${projectUrl + projectId}/tasks`;
  const res = await axios.get(url);
  return res?.data?.data;
};

export const deleteTask = async (taskId) => {
  let url = `${taskUrl + taskId}`;
  console.log(url, 'task test');

  const res = await axios.post(url);
  console.log(res, res.data, 'checkkk');

  return res?.data;
};




// Tests
export const getQuestions = async () => {
  const response = await _getData(questionsUrl);
  console.log(response);
};

export const deleteQuestion = async (statusId, typeNumber) => {
  let url = `${questionsUrl + statusId}`;
  const res = await axios.post(url, { type: typeNumber });
  return res?.data;
};

export const viewQuestion = async (statusId, typeNumber) => {
  let url = `${questionsUrl + statusId}`;
  const res = await axios.get(url);
  return res?.data;
};

// Exams
export const examsFetch = async () => {
  const response = await _getData('https://jsonplaceholder.typicode.com/todos');
  console.log(response);
};

export const deleteExam = async (statusId, typeNumber) => {
  let url = `${examsUrl + statusId}`;
  const res = await axios.post(url, { type: typeNumber });
  return res?.data;
};

export const viewExam = async (statusId, typeNumber) => {
  let url = `${examsUrl + statusId}`;
  const res = await axios.get(url);
  return res?.data;
};


// Navigation


// export const _getUser = () => {
//   let user = {};
//   try {
//     const local_user = localStorage.getObject("user");
//     user = _isAnEmpytyObject(local_user) ? null : local_user;
//   } catch {}
//   return user;
// };
export const _getUser = () => {
  try {
    if (isWindowDefined) {
      const localUser = JSON.parse(
        localStorage.getItem('exam-sys-user')
      );
      return localUser && Object.keys(localUser).length === 0
        ? null
        : localUser;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user from localStorage:', error);
    return null;
  }
};

export const ToasterAlert = (message, type) => {
  let alertTypes = {
    success: successtoastOptions,
    error: {
      ...successtoastOptions,
      icon: '❌', // Change icon to error icon
      iconTheme: {
        primary: 'red', // Change icon color to red for error
        secondary: '#fff',
      },
    },
  };

  if (type === 'error') {
    toast.error(message, alertTypes[type]);
  } else {
    toast.success(message, alertTypes[type]);
  }
};

// export const _isUserLoggedIn = () => {
//   const token = localStorage.getItem("accessProjectUserToken");
//   if (token !== null) return true;
//   return false;
// };

// export const _getToken = () => {
//   let token = "";
//   const local_token = localStorage.getObject("accessToken").access;
//   token =
//     (_isAnEmpytyObject(local_token) ? "" : local_token) ||
//     sessionStorage.get("token");
//   return token;
// };

export const handleRedirect = (role, push) => {
// const { push } = useRouter();

  const routes = {
      student: '/student/test-manager',
      admin: '/admin/dashboard',
      super_admin: '/admin/dashboard-main',
  };
  push(routes[role] || '/auth/login');
};

export function getGeneratedPassword(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const passwordLength = 12;
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export function shortenTitle(title) {
  // console.log(title?.length)
  if (title?.length < 20) {
    // If the address is too short to be shortened, return it as is
    return title;
  }

  const start = title?.slice(0, 14);
  return `${start}...`;
}

export function shortenTitle2(title) {
  // console.log(title?.length)
  if (title?.length < 300) {
    // If the address is too short to be shortened, return it as is
    return title;
  }

  const start = title?.slice(0, 14);
  return `${start}...`;
}


export const capitalize = (text) => {
  return text && text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const _copyToClipboard = (str, message) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const dateFormat = (date) => {
  const lastSeen = new Date(date).getTime();
  const secs = (Date.now() - lastSeen) / 1000;
  const mins = Math.round(secs / 60);
  const hrs = Math.round(mins / 60);
  const days = Math.round(hrs / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);

  // if (mins <= 2) return "1m";
  // if (mins <= 59) return `${mins}m`;
  // if (hrs === 1) return `1h `;
  // if (hrs <= 23) return `${hrs}h`;
  if (days <= 1) return `Today `;
  if (days <= 2) return `Yesterday `;
  if (days > 2 && days <= 30) return `${days} days ago `;
  if (months === 1) return `1 month ago `;
  if (months <= 11) return `${months} months ago `;
  if (years === 1) return `1y `;
  if (years > 1) return `${years}y `;
  return '';
};

export function getTotalMinutes(durationHours, durationMinutes) {
  return durationHours * 60 + durationMinutes;
}

export const formatMomentDate = (date) =>{
  const formattedDate = moment(date).format('ddd MMM Do, YYYY hh:mma');
  return formattedDate;
}
export const formattedDateString = (date) =>{
  const formattedDate = dayjs(date).set('month', 11).set('date', 1).set('hour', 23).set('minute', 59).set('second', 59).format('YYYY-MM-DD HH:mm:ss');;
  return formattedDate;
}



export function formatDuration(createdDateString, dateString) {
  const targetDate = new Date(dateString);
  const now = new Date(createdDateString);

  // Calculate the total difference in milliseconds
  const totalMilliseconds = targetDate.getTime() - now.getTime();

  // Convert milliseconds to days, hours, and minutes
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(totalMilliseconds / millisecondsInDay);
  const hours = Math.floor(
    (totalMilliseconds % millisecondsInDay) / millisecondsInHour
  );
  const minutes = Math.floor(
    (totalMilliseconds % millisecondsInHour) / millisecondsInMinute
  );

  // Format the result
  const dayStr = days > 0 ? `${days}d` : "";
  const hourStr = hours > 0 ? `${hours}h` : "";
  const minuteStr = minutes > 0 ? `${minutes}m` : "";

  // Combine the parts, filtering out empty strings and joining with commas
  return [dayStr, hourStr, minuteStr].filter(Boolean).join(", ");
}



// function getElapsedTime(startDate, endDate) {
//   const start = dayjs(startDate);
//   const end = dayjs(endDate);

//   const elapsedTime = dayjs.duration(end.diff(start));

//   // Get hours, minutes, and seconds
//   const hours = elapsedTime.hours();
//   const minutes = elapsedTime.minutes();
//   const seconds = elapsedTime.seconds();

//   return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
// }

export function calculateCompletionPercentage(startDate, endDate, perc = false) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Calculate the total duration between the start and end dates
  const totalDuration = end.getTime() - start.getTime();

  // Calculate the duration between the start date and today
  const completedDuration = today.getTime() - start.getTime();
  if(!perc)
    return completedDuration;
  // Calculate the percentage of completion
  const percentage = (completedDuration / totalDuration) * 100;

  // Cap the percentage between 0% and 100%
  const cappedPercentage = Math.min(Math.max(percentage, 0), 100);

  return cappedPercentage;
}

export function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Calculate the total duration between the start and end dates
  const totalDuration = end.getTime() - start.getTime();

  const durationInMinutes = Math.floor(totalDuration / (1000 * 60));

  return durationInMinutes;
}





export const DisplayDuration = (startDate, endDate ) =>{
  const completedDuration = calculateCompletionPercentage(startDate, endDate, false);

  // Convert milliseconds to seconds, minutes, and hours
  const seconds = Math.floor((completedDuration / 1000) % 60);
  const minutes = Math.floor((completedDuration / (1000 * 60)) % 60);
  const hours = Math.floor((completedDuration / (1000 * 60 * 60)) % 24);

  // Display formatted duration (for example, as "HH:mm:ss")
  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return <span>{formattedDuration}</span>;
}


export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const deadline = (item) => {
  const firstFormat = new Date(item);
  const minusSeven = firstFormat?.setDate(firstFormat?.getDate() - 7);
  const finalDate = item && new Date(minusSeven)?.toISOString();
  return finalDate;
};

export const isMobileWidth = (width = 640) =>
  window.matchMedia(`(max-width:${width}px)`).matches;

export function downloadImg(imgUrl) {
  axios
    .get(imgUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf',
      },
    })
    .then((response) => {
      const url = isWindowDefined
        ? window.URL.createObjectURL(new Blob([response.data]))
        : '';
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.png'); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => console.log(error));
}

export const getRootUrl = (appendPath = '') =>
  isWindowDefined
    ? `${window?.location?.protocol}//${window?.location?.host}/${appendPath}`
    : '';

export const checkIsDesktopMedia = isWindowDefined
  ? window.matchMedia('(min-width: 992px)')
  : null;
  
export const checkMedia = isWindowDefined
  ? window.matchMedia('(max-width: 767.99px)')
  : null;

export const currencyFormat = (value) =>
  isWindowDefined ? Intl.NumberFormat().format(value) : null;

export function filterArrOfObj(term = '', arr = [], banned = ['edit', 'no']) {
  if (!Array.isArray(arr)) return [];
  if (!term) return arr;

  const handleFilter = (o) => {
    return Object.keys(o).some((k) => {
      if (banned?.includes(k)) {
        return false;
      }

      if (o[k] === null || o[k] === 'undefined') {
        return false;
      } else if (Array.isArray(o[k])) {
        const result = o[k].filter((obj) => handleFilter(obj));
        return !!result.length;
      } else if (typeof o[k] === 'object') {
        return handleFilter(o[k]);
      } else if (typeof o[k] === 'string') {
        return o[k]?.toLowerCase()?.includes(term?.toLowerCase());
      } else {
        return false;
      }
    });
  };

  let filtered = arr?.filter((o) => handleFilter(o));

  return filtered;
}

// export function convertModelToFormData(model, form = null, namespace = "") {
//   let formData = form || new FormData();

//   for (let propertyName in model) {
//     if (
//       !model.hasOwnProperty(propertyName) ||
//       model[propertyName] === undefined
//     ) {
//       continue;
//     }

//     let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

//     if (model[propertyName] instanceof Date) {
//       formData.append(formKey, model[propertyName].toISOString());
//     } else if (model[propertyName] instanceof Array) {
//       model[propertyName].forEach((element, index) => {
//         const tempFormKey = `${formKey}[${index}]`;
//         convertModelToFormData(element, formData, tempFormKey);
//       });
//     } else if (
//       model[propertyName] !== null &&
//       typeof model[propertyName] === "object" &&
//       !(model[propertyName] instanceof File)
//     ) {
//       convertModelToFormData(model[propertyName], formData, formKey);
//     } else if (
//       typeof model[propertyName] === "object" &&
//       model[propertyName] instanceof File
//     ) {
//       console.log({ property: model[formKey], formKey, propertyName });
//       formData.append(formKey, model[propertyName], model[propertyName].name);
//     } else if (typeof model[propertyName] === "boolean") {
//       formData.append(formKey, !!model[propertyName]);
//     } else {
//       if (model[propertyName] === null) model[propertyName] = "";
//       formData.append(formKey, model[propertyName].toString());
//     }
//   }

//   return formData;
// }

const validateFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon'];
  const isValid = !validTypes.includes(file.type);
  //
  return isValid;
};

export function setFilePreview(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    const isInvalid = validateFile(file);
    if (isInvalid) {
      //resolve here with invalid flag
    }
    reader.onloadend = function () {
      const fileWithBase64 = Object.assign(file, {
        url: reader.result,
        isFile: true,
      });
      return resolve(fileWithBase64);
    };
    reader.readAsDataURL(file);
  });
}

// export function validatePhoneNumber(value) {
//   let copyVal = value;
//   value = value ? formatPhoneNumberIntl(value) : "";
//   value = value?.replace(/\s+/g, "");
//   value = value || copyVal; //prevent return empty string due to invalid format
//   let error = !!value ? undefined : "must be a valid number";
//   if (value && !isValidPhoneNumber(value)) error = "invalid Phone number";
//   return { error, value };
// }

// export function getUserLocation() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject("sorry geolocation is not suppoerted");
//     }
//     navigator.geolocation.getCurrentPosition(success, error);
//     function success(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       return resolve({ latitude, longitude });
//     }
//     function error(error) {
//       return reject(
//         "sorry we couldn't get your location, but you can search for it"
//       );
//     }
//   });
// }

export const filterOptions = (inputValue, data) =>
  data?.filter(({ label }) =>
    label?.toLowerCase()?.includes(inputValue?.toLowerCase())
  );

export const mapOptions = (data) =>
  data.map((dt) => ({
    label: dt?.name,
    value: dt?.code,
  }));

// export function fetchBank(inputValue, cb) {
//   axios
//     .get("https://fitted-staging-api.herokuapp.com/api/v1/bank/banks")
//     .then((res) => {
//       console.log(res.data?.data);
//       cb(filterOptions(inputValue, mapOptions(res?.data?.data)));
//     })
//     .catch((err) => {});
// }

// export const maskMessage = (msg) =>
//   msg?.includes("outfitBuyerId must be a string")
//     ? "measurements from last year can't be downloaded, we sincerely apologize for the inconvenience!!"
//     : msg;

export const getInitialInfo = (customerInfo) => ({
  id: customerInfo?._id || customerInfo?.id || '',
  firstname: customerInfo?.firstname || '',
  lastname: customerInfo?.lastname || '',
  gender: customerInfo?.gender || '',
  email: customerInfo?.email || '',
  phone: customerInfo?.phone || '',
});

// export const isLiveSite = () => process.env.REACT_APP_LIVE_SITE === "live";

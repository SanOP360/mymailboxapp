// useFetchEmails.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchEmailsSuccess } from "../store/emailSlice";

const useFetchEmails = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const fetchedEmails = [];
          for (const key in response.data) {
            fetchedEmails.push({
              id: key,
              ...response.data[key],
            });
          }
          dispatch(fetchEmailsSuccess(fetchedEmails));
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchEmails();
  }, [dispatch, url]);
};

export default useFetchEmails;

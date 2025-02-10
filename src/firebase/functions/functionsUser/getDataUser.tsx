import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config";
import { verification } from "../interfaces";


interface UserDataProps {
  setFilteredUsersData: (data: any[]) => void;
  setUsersData: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
}


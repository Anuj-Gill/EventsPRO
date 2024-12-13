import axios from "axios";
import axiosInstance from "./axiosInstance";
import { CommitteeMembersResponse } from "../interfaces/committeeInterfaces/CommitteeMembersResponseInterface";

export const getCommittees = async () => {
  try {
    const response = await axiosInstance.get("/committee/all");
    return response;
  } catch (error) {
    console.error("Error fetching all committees:", error);
    throw error;
  }
}

export const getCommitteeInfo = async () => {
  try {
    const response = await axiosInstance.get("/committee/info");
    return response;
  } catch (error) {
    console.error("Error fetching committees info:", error);
    throw error;
  }
}

export const getCommitteePubs = async () => {
  try {
    const response = await axiosInstance.get("/committee/pubs");
    return response;
  } catch (error) {
    console.error("Error fetching committee pubs:", error);
    throw error;
  }
}

export const getCommitteeMembers = async () => {
  try {
    const response = await axiosInstance.get("/committee/members");
    return response;
  } catch (error) {
    console.error("Error fetching committee members:", error);
    throw error;
  }
}

interface CommitteeInfo {
  committeeName: string,
  description: string,
  committeeLogo: string
}

export const updateCommitteeInfoApi = async (info: CommitteeInfo) => {
  try {
    const response = await axiosInstance.post("/committee/update/info", { info });
    return response;
  } catch (error) {
    console.error("Error fetching all committees:", error);
    throw error;
  }
}

interface Pubs {
  name: string,
  contact: string
}

export const addCommitteePubs = async (details: Pubs) => {
  try {
    const response = await axiosInstance.post("/committee/add/pubs", { details });
    return response;
  } catch (error) {
    console.error("Error adding pubs:", error);
    throw error;
  }

}

interface SocialHandle {
  platform: string,
  handle: string
}

export const addSocialHandleApi = async (details: SocialHandle) => {
  try {
    const response = await axiosInstance.post("/committee/add/socialhandle", { details });
    return response;
  } catch (error) {
    console.error("Error adding social handle:", error);
    throw error;
  }

}


export const getSocialHandlesApi = async () => {
  try {
    const response = await axiosInstance.get("/committee/socialhandles");
    return response;
  } catch (error) {
    console.error("Error fetching social handles:", error);
    throw error;
  }

}

export const getSocialHandlesUsersApi = async (committeeId: number) => {
  try {
    const response = await axiosInstance.get("/committee/socialhandlesUser", {
      params: {
        committeeId
      }
    });
    return response;
  } catch (error) {
    console.error("Error fetching social handles:", error);
    throw error;
  }

}

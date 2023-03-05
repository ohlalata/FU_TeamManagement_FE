import axios from "axios";

export const getCourse = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/Active-for-student`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentCourse = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/list-course`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTeam = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/list-team`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

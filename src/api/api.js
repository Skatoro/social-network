import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {
        "API-KEY": "5f8a2113-f2a2-468b-812d-da78f544190d",
    }

})
export const userAPI = {
    getUsers(currentPage, pageSize) {
        currentPage += 64;         // to start seeing alive people | Чтобы начать видеть живых людей
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
}
export const authAPI = {
    getUserAuthData() {
        return instance.get(`/auth/me`);
    },
    login(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login',)
    },
}
export const profileAPI = {
    getUserProfileData(userId) {
        return instance.get(`/profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getUserStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
            .then(response => {
                return response;
            })
    },
    updateUserStatus(status) {
        return instance.put(`/profile/status`, {
            status,
        })
    },
    saveProfilePicture(profilePicture) {
        let formData = new FormData();
        formData.append("image", profilePicture);

        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`/profile`, profile)
    }
}
export const followAPI = {
    unfollowUser(userId) {
        return instance.delete(`/follow/${userId}`);
    },
    followUser(userId) {
        return instance.post(`/follow/${userId}`, {});
    }
}
export const securityAPI = {
    getCaptchaURL() {
        return instance.get("/security/get-captcha-url");
    }
}
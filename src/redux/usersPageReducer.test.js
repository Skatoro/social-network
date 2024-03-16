import usersPageReducer, {setTotalUsersCount, setUsers} from "./usersPageReducer";
import React from "react";

let state = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [2, 3]
}
let users = [
    {
        followed:false,
        id:30608,
        name:"Darkfun9559",
        photos:
            {
                small: null,
                large: null
            },
        status:null,
        uniqueUrlName:null,
    }, {
        followed:false,
        id:1,
        name:"14231",
        photos:
            {
                small: null,
                large: null
            },
        status:null,
        uniqueUrlName:null,
    },]

test('usersTotalCount should be set', () => {
    // 1. test data
    let action = setTotalUsersCount(7)

    // 2. action
    let newState = usersPageReducer(state, action)

    // 3. expectation
    expect(newState.totalUsersCount).toBe(7)
});

test("users should be set", () => {
    // 1. test data

    let action = setUsers(users)

    // 2. action
    let newState = usersPageReducer(state, action)

    // 3. expectation
    expect(newState.users.length).toBe(2)

})
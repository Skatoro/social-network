import {connect} from "react-redux";
import {getUsersThunkCreator, setCurrentPage,} from "../../../redux/usersPageReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber, pageSize = this.props.pageSize) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader/>
        }
        return <>

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                itemPortionSize={this.props.itemPortionSize}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        itemPortionSize: state.usersPage.itemPortionSize,
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        getUsers: getUsersThunkCreator,
    })
)(UsersContainer)
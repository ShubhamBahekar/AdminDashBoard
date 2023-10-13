import { useState, useEffect } from "react";
import ApiData from "./ApiData";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchBox";
import UserTable from "./UserTable";
import "./styles.css";
import "./buttons.css";

function Admin() {
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAllUsersSelected, setIsAllUsersSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await ApiData.getApiData();
      console.log(response);
      return setUserData(response);
    } catch (e) {
      console.log("Error while fetching Data", e);
    }
  };
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAllUsers = () => {
    if (isAllUsersSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dataPerPage.map((user) => user.id));
    }
    setIsAllUsersSelected(!isAllUsersSelected);
  };

  const handleDeleteSelected = () => {
    // Remove selected users from userData
    const updatedData = userData.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUserData(updatedData);

    // Clear selectedUsers array and uncheck "Select All" checkbox
    setSelectedUsers([]);
    setIsAllUsersSelected(false);
  };

  // Calculate dataPerPage here
  const filteredData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = firstIndex + usersPerPage;
  const dataPerPage = filteredData.slice(firstIndex, lastIndex);

  return (
    <div className="container">
      <Header />
      <SearchBox
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <UserTable
        userData={userData}
        searchQuery={searchQuery}
        selectedUsers={selectedUsers}
        onSelectUser={(userId) =>
          setSelectedUsers((prevSelected) => [...prevSelected, userId])
        }
        onDeselectUser={(userId) =>
          setSelectedUsers((prevSelected) =>
            prevSelected.filter((id) => id !== userId)
          )
        }
        onDeleteUser={(userId) =>
          setUserData((prevData) =>
            prevData.filter((user) => user.id !== userId)
          )
        }
        onEditUserInfo={(userId, updatedUser) => {
          setUserData((prevData) =>
            prevData.map((user) =>
              user.id === userId ? { ...user, ...updatedUser } : user
            )
          );
        }}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        onSelectAllUsers={handleSelectAllUsers}
        isAllUsersSelected={isAllUsersSelected}
        dataPerPage={dataPerPage}
      />
      <button className="btn btn-danger my-3" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
      <Footer
        currentPage={currentPage}
        totalPage={Math.ceil(filteredData.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Admin;

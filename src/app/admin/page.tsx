'use client'
import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'
import { User, UserTable } from '../../components/userTable/UserTable'
import {
  ModalUserEdit,
  ModalUserDelete,
  ModalUserCreate,
} from '../../components/adminModal/AdminUserModals'
import TableFilter from '../../components/userTable/TableFilter'
import { Edit, Delete } from '@mui/icons-material'

export interface UserNoActions {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

const createData = (
  name: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  actions: any,
): User => {
  return { name, email, role, createdAt, updatedAt, deletedAt, actions }
}

const columns: string[] = [
  'Name',
  'Email',
  'Role',
  'CreatedAt',
  'UpdatedAt',
  'Actions',
]
const columnsToFilter: string[] = [columns[0], columns[1], columns[2]]


export default function AdminPage() {
  const [creating, setCreating] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)
  const [removing, setRemoving] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<any>(null)

  const [users, setUsers] = useState<User[]>([])
  const [filteredRows, setFilteredRows] = useState<User[]>(users)

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)

  /**
   * User creation management
   */
  const handleCreateUser = () => {
    setDataModal(null)
    setCreating(true)
  }

  /**
   * User modify management
   *
   * @param {*} user user to edit
   */
  const modifyUser = (user: UserNoActions) => {
    setDataModal(user)
    setEditing(true)
  }

  /**
   * User remove management
   *
   * @param {*} userName user's username
   */
  const handleRemoveUser = (userId: number) => {
    setDataModal({ userId })
    setRemoving(true)
  }

  useEffect(() => {
    const fetchUsers = async (page: number, pageSize: number) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        })
        if (!response.ok) {
          const errorText = await response.text()
          console.log('an error ocurred fetching the users')
          console.log(errorText)
          return
        }
        const startIndex = page * pageSize
        const endIndex = startIndex + pageSize
        const allUsers = await response.json()
        const usersSliced = allUsers.slice(startIndex, endIndex)
        const userList = usersSliced.map((user: UserNoActions) => {
          return createData(
            user.name,
            user.email,
            user.role,
            user.createdAt,
            user.updatedAt,
            '',
            createActionsComponent({ user }),
          )
        })
        setUsers(userList)
        setFilteredRows(userList)
      } catch (e) {
        return
      }
    }

    /**
     * Create the component that contains the actions on the users
     *
     * @param {*} user user to whom the actions will be performed
     * @returns A component that contains the actions on the users
     */
    const createActionsComponent: React.FC<{ user: UserNoActions }> = ({
      user,
    }) => {
      return (
        <Grid container justifyContent="center" columns={4} spacing={1.5}>
          <Grid item xs={1} justifyContent="right">
            <Tooltip title="Modify user" arrow>
              <IconButton color="primary" onClick={() => modifyUser(user)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={0} justifyContent="left">
            <Tooltip title="Delete user" arrow>
              <IconButton
                color="primary"
                onClick={() => handleRemoveUser(user.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )
    }

    fetchUsers(page, pageSize)
  }, [page, pageSize])

  return (
    <>
      {creating && (
        <ModalUserCreate
          open={creating}
          setOpen={setCreating}
          data={dataModal}
          onChangedUsers={async () => setPageSize(pageSize + 1)}
        />
      )}
      {editing && (
        <ModalUserEdit
          open={editing}
          setOpen={setEditing}
          data={dataModal}
          onChangedUsers={async () => setPageSize(pageSize + 1)}
        />
      )}
      {removing && (
        <ModalUserDelete
          open={removing}
          setOpen={setRemoving}
          data={dataModal}
          onChangedUsers={async () => setPageSize(pageSize + 1)}
        />
      )}
      <Box className="box-content">
        <AppBar position="fixed">
          <Toolbar className="navbar">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`Administrator Dahsboard`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }} className="pt-24">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            paddingRight="1px"
          >
            <Typography variant="h5" className="welcome-text">
              User List
            </Typography>
            
          </Grid>
          <Grid item md={12}>
            <TableFilter
              columns={columnsToFilter}
              rows={users}
              setFilteredRows={setFilteredRows}
              handleCreateUser={handleCreateUser}
            />
            <UserTable
              filteredRows={filteredRows}
              columns={columns}
              onPageChange={setPage}
              onSizeChange={setPageSize}
              users={users}
            />
          </Grid>
        </Box>
      </Box>
    </>
  )
}

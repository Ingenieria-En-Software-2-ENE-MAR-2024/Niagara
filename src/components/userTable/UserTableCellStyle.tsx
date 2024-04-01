import { styled, TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const UserTableCellStyle = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1e1b4b',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      maxWidth: '196px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
}));

export default UserTableCellStyle
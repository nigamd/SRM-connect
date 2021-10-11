import {combineReducers} from 'redux';
import auth from './auth';
import attendance from './attendance';
import messages from './messages';
import grades from './grades';
import timetable from './timetable';
import sgpa from './sgpa';
import student_list from './student_list';
export default combineReducers({
    auth,
    attendance,
    messages,
    grades,
    timetable,
    sgpa,
    student_list,
});
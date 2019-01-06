import { connect } from 'react-redux';
import SubmitContent from '../../screens/Submit/SubmitContent';
import { getUser } from '../../selectors/user';

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(mapStateToProps)(SubmitContent);

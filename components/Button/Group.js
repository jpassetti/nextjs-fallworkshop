import classnames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

const Group = ({ children, justifyContent }) => {
    let groupClasses = cx({
        btn__group: true,
        [`justify-content-${justifyContent}`]: justifyContent
    });

    return (
        <div className={groupClasses}>
            {children}
        </div>
    );
};

export default Group;

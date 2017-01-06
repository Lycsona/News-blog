'use strict';

import Immutable from 'immutable';

const User = Immutable.Record({
    id: '',
    status: true,
    name: '',
});

export default User;
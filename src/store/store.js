import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev
const reduxStore = configureStore({})

export default reduxStore


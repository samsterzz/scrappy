/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {Login, Signup} from './auth-form'
export {default as AllView} from './all-view'
export {default as ProjectList} from './project-list'
export {default as ProjectView} from './project-view'
export {default as SearchView} from './search-view'
export {default as SettingsList} from './settings-list'
export {default as SettingsHome} from './settings-home'
export {default as SettingsProjects} from './settings-projects'
export {default as Upload} from './upload'
export {default as Note} from './note'
export {default as Modal} from './modal'
export {default as Project} from './project'
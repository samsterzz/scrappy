/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Note, Project} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'sam@email.com', password: '123', firstName: 'Sam'}),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const projects = await Promise.all([
    Project.create({name: 'Senior Thesis', userId: 1}),
    Project.create({name: 'Research Project', userId: 1}),
    Project.create({name: 'Short Paper', userId: 1})
  ])
  console.log(`seeded ${projects.length} projects`)

  const notes = await Promise.all([
    Note.create({text: 'i am a test', userId: 1, projectId: 1}),
    Note.create({text: 'i am also a test', userId: 1, projectId: 1}),
    Note.create({text: 'i am thirdly a test', userId: 1, projectId: 3}),
    Note.create({text: 'i am a note for another project', userId: 1, projectId: 2})
  ])
  console.log(`seeded ${notes.length} notes`)

  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

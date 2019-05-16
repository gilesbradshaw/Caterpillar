import {
  roleTaskSchema
} from '../repo'

export default async ({
  _id,
}): Promise<any[]> =>
  roleTaskSchema.find({
    _id,
  })
  .then(
    ([ roleTask ]) =>
      roleTask,
  )
  

import prisma from '../../../prisma/prisma'
import { add_property } from '../utils/utils'
import { add_object_to_array } from '../utils/utils'



export const list_logs = async (
  search_fields?: string[],
  search_texts?: string[],
) => {
  try {
    let where_clause = {}
    let logs
    if (search_fields != null && search_texts != null) {
      if (search_fields.length > 1) {
        let object_where: any[] = []
        for (let i = 0; i < search_fields.length; i++) {
          object_where = add_object_to_array(
            object_where,
            search_fields[i],
            search_texts[i],
          )
        }
        logs = await prisma.logs.findMany({
          where: { AND: object_where },
        })
      } else {
        add_property(where_clause, search_fields[0], search_texts[0])
        logs = await prisma.logs.findMany({
          where: where_clause,
        })
      }
      return logs
    } else {
      const logs = await prisma.logs.findMany({})

      return logs
    }
  } catch (error) {
    throw error
  }
}

export const delete_my_log = async (id: number) => {
  try {
    const delete_log = await prisma.logs.delete({
      where: {
        id: id,
      },
    })

    if (!delete_log) {
      throw new Error('User does not exists')
    }

    return delete_log
  } catch (error) {
    throw error
  }
}

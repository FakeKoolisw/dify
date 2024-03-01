'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import produce from 'immer'
import Item from './dataset-item'
import type { DataSet } from '@/models/datasets'
type Props = {
  list: DataSet[]
  onChange: (list: DataSet[]) => void
}

const DatasetList: FC<Props> = ({
  list,
  onChange,
}) => {
  const handleRemove = useCallback((index: number) => {
    return () => {
      const newList = produce(list, (draft) => {
        draft.splice(index, 1)
      })
      onChange(newList)
    }
  }, [])

  const handleChange = useCallback((index: number) => {
    return (value: DataSet) => {
      const newList = produce(list, (draft) => {
        draft[index] = value
      })
      onChange(newList)
    }
  }, [list, onChange])
  return (
    <div className='space-y-1'>
      {
        list.map((item, index) => {
          return (
            <Item
              key={index}
              payload={item}
              onRemove={handleRemove(index)}
              onChange={handleChange(index)}
            />
          )
        })
      }

    </div>
  )
}
export default React.memo(DatasetList)

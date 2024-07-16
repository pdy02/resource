import React, { useCallback, useState } from 'react'

type IProps = {
  onChange: (value: string) => void
}
export default function classifySearchBox(props: IProps) {


  /**搜索框文本内容 */
  const [value, setValue] = useState('');
  /**搜索框文本内容改变 */
  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认行为 提交
    console.log("submit", value);
    props.onChange(value) // 传递给父组件
  }
  const showAllhandle = (e: React.MouseEvent) => {
    setValue('')
    props.onChange('')
  }
  return (
    <>
      <div className='box'>
        <form className='block-man' onSubmit={submitHandle}>
          <label className='block-man'>
            <input required value={value} onChange={changeHandle} type="text" />
            <span className="bar transition"></span>
            <span className='pla-tip transition'>搜索资源</span>
            <button type='submit' className='text-box bold search-btn'>搜索</button>
            <button type='button' onClick={showAllhandle} className='text-box bold all-btn'>All </button>
          </label>
        </form>
      </div>
      {/* <div className='all-box'>全部</div> */}
      <style jsx>
        {`
          .box{
            --h:2.5em;
            --border: 2px;
            --color: #ced4da;
            width: 18em;
            height: var(--h);
            margin-top: 1.5em;
            // padding-top: 1.2em;
            // box-sizing: content-box;
            border-bottom: var(--border) solid var(--color);
            position: relative;
            @media (width < 500px){
              width: 100%;
            }
          }
          .pla-tip{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: #aaa;
            font-size: 16px;
            padding-left: 0.5em;
            pointer-events: none;
          }
          .bar{
              width: 0%;
              height: var(--border);
              border-radius: var(--border);
              display: block;
              position: absolute;
              // bottom: -3px;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%) translateY(100%);
              background-color: var(--theme-color);
          }
          .block-man{
            display: block;
            height:100%;
            width:100%;
          }
          input{
            width: 100%;
            height:100%;
            border:none;
            background-color: rgba(0,0,0,0);
            font-size: 16px;
            padding:0 calc(4em + 8px) 0 0.5em;
            outline: none;
            &:focus~ .bar{
              width:100%;
            }
            &:valid~ .pla-tip,
            &:focus~ .pla-tip{
              color: var(--theme-color);
              // font-weight: bold;
              font-size: 0.8em;
              top: 0;
              transform: translateY(-100%);
            }
          }
          .text-box{
            width: 3em;
            border: none;
            height: 100%;
            line-height: var(--h);
            // font-size: 0.8em;
            position: absolute;
            top:0;
            right:0;
            text-align: center;
            // background-color: red;
            letter-spacing:2px;
            cursor:pointer;
            background-color: transparent;
            transition:background-color 0.2s;
            &:hover{
              background-color: #dee2e6;
            }
          }
          .search-btn{
            right: 3em;
          }
          .all-btn{
            right: 0;
          }
        `}
      </style>
    </>
  )
}

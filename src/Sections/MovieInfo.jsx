import React from 'react'
import { Descriptions, Badge } from 'antd'
import './Movieinfo.css'
function MovieInfo(props) {
    let {movie} = props;
  return (
    <div className="movie-info">
    <Descriptions title="Movie Info" bordered>
        <Descriptions.Item style={{color: 'white'}} label="Title">{movie.original_title}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="release_data">{movie.release_date}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="revenue">{movie.revenue}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="runtime">{movie.runtime}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="vote_average" span={2}>
            {movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="vote_count">{movie.vote_count}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="status">{movie.status}</Descriptions.Item>
        <Descriptions.Item style={{color: 'white'}} label="popularity">{movie.popularity}</Descriptions.Item>

    </Descriptions>
    </div>
  )
}

export default MovieInfo

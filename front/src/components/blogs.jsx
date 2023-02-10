import React from 'react';

export default function Blogs(props) {
	const posts = props.postListes;
	
    return (
        <><div className='titre'> Liste des enregistrements : </div><table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				{posts.map((post) => (
					<tr key={post.id}>
						<th scope="row">{post.id}</th>
						<td>{post.name}</td>
						<td>{post.email}</td>
						<td>{post.password}</td>
					</tr>
				))}
				<tr>
					<th scope="row"></th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>

			</tbody>
		</table></>
    )
}


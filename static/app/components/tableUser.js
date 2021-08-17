export default {
    props: ["users"],
    emits: ["izmena", "uklanjanje"],
    data() {
        return {}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Balance</th>
        
       
        
        <th>Akcija</th>
        <th>Akcija</th>
    </tr>
</thead>
<tbody>
    <tr v-for="user in users">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.surname}}</td>
        <td>{{user.balance}}</td>
 
        
        <td><button v-on:click="$emit('izmena', {...user})">Izmeni</button></td>
        <td><button v-on:click="$emit('uklanjanje', user.id)">Ukloni</button></td>
    </tr>
</tbody>
</table>
    `
}
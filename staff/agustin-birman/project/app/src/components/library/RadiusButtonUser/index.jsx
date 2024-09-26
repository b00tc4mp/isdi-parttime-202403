import Input from '../../core/Input'
import Label from '../../core/Label'

function RadiusButtonUser({ selectedValue, onChange }) {
    return (
        <div className='RadioButtonUser'>
            <div>
                <Input
                    id='student'
                    type='radio'
                    name='userType'
                    value='student'
                    checked={selectedValue === 'student'}
                    onChange={onChange}
                />
                <Label htmlFor='student'>Student</Label>
            </div>
            <div>
                <Input
                    id='teacher'
                    type='radio'
                    name='userType'
                    value='teacher'
                    checked={selectedValue === 'teacher'}
                    onChange={onChange}
                />
                <Label htmlFor='teacher'>Teacher</Label>
            </div>
        </div>
    )
}

export default RadiusButtonUser
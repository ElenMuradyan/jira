import { Form, Input, Select, Space } from "antd";
import { ISSUE_OPTIONS } from "../../../../core/utilis/issues";

const ModalForm = ({ form, onFinish }) => {
    return(
        <Form
        layout="vertical" 
        form={form} 
        onFinish={onFinish}
        >
            <Form.Item 
            name='issueName'
            label='Issue Name'
            rules={[{
                required: true,
                message: 'Plaese Input Issue Name'
            }]}
            >
                <Input type='text' placeholder="Issue Name"/>
            </Form.Item>
            <Form.Item
            name='type'
            label='Issue Type'
            rules={[{
                required: true,
                message: 'Plaese Select Issue Type'
            }]}
            >
                <Select>
                    {
                        Object.values(ISSUE_OPTIONS).map(({ value, icon, label }) => {
                            return(
                                <Select.Option value={value} key={value}>
                                    <Space>
                                        {icon}
                                        <span>{label}</span>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
};

export default ModalForm;
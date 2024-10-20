import LocalComponent from './components/LocalComponent';
import TranslationExample from './components/TranslationExample';

import { Button, Input } from '@ce-lab-mgmt/shared-ui';

export default function ExamplePage() {
  return (
    <div>
      <div className='h-96 bg-slate-800'></div>
      <p className="text-error-500">Example Page</p>
      <Button variant="destructive">test</Button>
      <Input title="test" inputMode="tel"></Input>
      <LocalComponent />
      <TranslationExample />
      <h2>Test h2 สวัสดีจ้า</h2>
    </div>
  );
}

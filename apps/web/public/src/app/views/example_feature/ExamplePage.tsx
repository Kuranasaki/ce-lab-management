import LocalComponent from './components/LocalComponent';
import TranslationExample from './components/TranslationExample';

import { Button, Input } from '@ce-lab-mgmt/shared-ui';

export default function ExamplePage() {
  return (
    <div>
      <p className="text-red-500">Example Page</p>
      <Button variant="destructive">test</Button>
      <Input title="test" inputMode="tel"></Input>
      <LocalComponent />
      <TranslationExample />
    </div>
  );
}

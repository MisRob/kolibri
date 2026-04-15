import { render, screen } from '@testing-library/vue';
import { TaskTypes } from 'kolibri-common/utils/syncTaskUtils';
import { coreString } from 'kolibri/uiText/commonCoreStrings';
import { deviceString } from '../../commonDeviceStrings';
import TaskPanel from '../TaskPanel';

const { exportChannelPartial, exportChannelWhole, startedByUser, numResourcesAndSize } =
  TaskPanel.$trs;

const EXPORT_TASK = {
  type: TaskTypes.DISKCONTENTEXPORT,
  status: 'CANCELED',
  clearable: true,
  extra_metadata: {
    channel_name: 'Canceled disk export channel test',
    started_by_username: 'Tester',
    file_size: 5000,
    total_resources: 500,
  },
};
const FILE_SIZE = '5 KB';

function renderComponent(task) {
  return render(TaskPanel, {
    props: {
      task,
    },
  });
}

describe('TaskPanel', () => {
  it('shows canceled partial export details including resource totals for a canceled disk content export task', () => {
    const { channel_name, started_by_username, total_resources } = EXPORT_TASK.extra_metadata;
    renderComponent(EXPORT_TASK);

    expect(screen.getByText(deviceString('statusCanceled'))).toBeInTheDocument();
    expect(
      screen.getByText(exportChannelPartial.message.replace('{channelName}', channel_name)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(startedByUser.message.replace('{user}', started_by_username)),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: coreString('clearAction') })).toBeInTheDocument();
    expect(
      screen.getByText(
        numResourcesAndSize.message
          .replace('{numResources}', total_resources)
          .replace('{numResources, plural, one {resource} other {resources}}', 'resources')
          .replace('{bytesText}', FILE_SIZE),
      ),
    ).toBeInTheDocument();
  });

  it('shows canceled bulk export details including resource totals for a canceled disk export task', () => {
    const { channel_name, started_by_username, total_resources } = EXPORT_TASK.extra_metadata;
    renderComponent({ ...EXPORT_TASK, type: TaskTypes.DISKEXPORT });

    expect(screen.getByText(deviceString('statusCanceled'))).toBeInTheDocument();
    expect(
      screen.getByText(exportChannelWhole.message.replace('{channelName}', channel_name)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(startedByUser.message.replace('{user}', started_by_username)),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: coreString('clearAction') })).toBeInTheDocument();
    expect(
      screen.getByText(
        numResourcesAndSize.message
          .replace('{numResources}', total_resources)
          .replace('{numResources, plural, one {resource} other {resources}}', 'resources')
          .replace('{bytesText}', FILE_SIZE),
      ),
    ).toBeInTheDocument();
  });
});

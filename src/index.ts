import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the ipylgbst extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ipylgbst:plugin',
  description:
    'A widget library for controlling LEGO® BOOST via web-bluetooth',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension ipylgbst is activated!');
  }
};

export default plugin;

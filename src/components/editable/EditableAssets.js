import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalize } from '../../helpers/functions';
import { EditableSelect, EditableInput } from 'components/editable';

export const EditableAssets = ({ rental, onUpdate }) =>
    <div className="rental-assets">
        <h3 className="title">Assets</h3>
        <div className="row">
            <div className="col-md-6">
                <span>
                    <FontAwesomeIcon icon="asterisk" /> Air Conditioning:
                    <EditableSelect
                        entity={rental}
                        field={'airCon'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="thermometer" /> Heating:
                    <EditableSelect
                        entity={rental}
                        field={'heating'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="snowflake" /> Refrigerator:
                    <EditableSelect
                        entity={rental}
                        field={'refrigerator'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="wine-glass" /> Dishwasher:
                    <EditableSelect
                        entity={rental}
                        field={'dishwasher'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="tshirt" /> Washer/Dryer:
                    <EditableSelect
                        entity={rental}
                        field={'laundry'}
                        options={['Communal', 'In-unit']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
            </div>
            <div className="col-md-6">
                <span>
                    <FontAwesomeIcon icon="shield-alt" /> Security:
                    <EditableInput
                        entity={rental}
                        field={'security'}
                        onUpdate={onUpdate}
                        className={'rental-city'}
                        containerType={"inline"}
                        transformView={value => capitalize(value)}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="bone" /> Pets:
                    <EditableSelect
                        entity={rental}
                        field={'pets'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
                <span>
                    <FontAwesomeIcon icon="smoking" /> Smoking:
                    <EditableSelect
                        entity={rental}
                        field={'smoking'}
                        options={['true', 'false']}
                        onUpdate={onUpdate}
                        containerType={"inline"}
                        className={'mr-0 ml-2'}
                    />
                </span>
            </div>
        </div>
    </div>
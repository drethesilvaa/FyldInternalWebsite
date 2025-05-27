import React from 'react';

export interface OrgPerson {
    label: string;
    labelType?: string;
    image?: string;
    role?: string;
    children?: OrgNode[];
}

export interface OrgGroup {
    type?: 'group';
    people?: OrgPerson[];
    children?: OrgNode[];
    label?: string;
    labelType?: string;
    role?: string;
}

export type OrgNode = OrgPerson | OrgGroup;

interface OrgChartProps {
    data: OrgPerson;
}

const getTextFormat = (size: string) => {
    switch (size) {
        case "xx-large":
            return "text-2xl font-semibold mx-auto bg-primary text-white md:w-1/3 p-2 rounded-sm uppercase"
            break;
        case "x-large":
            return "text-xl bg-secondary p-1 rounded-xl mx-auto md:w-2/3 font-bold text-white"
            break;
        case "large":
            return "text-lg font-semibold"
            break;

        default:
            return ""
            break;
    }
}

const getContainerFormat = (size: string) => {
    switch (size) {
        case "xx-large":
            return "border-xx-large"
            break;
        case "x-large":
            return "border-x-large"
            break;
        case "large":
            return ""
            break;

        default:
            return ""
            break;
    }
}

const PersonNode: React.FC<{ person: OrgPerson }> = ({ person }) => (
    <div className="person-node">
        <div className="info">
            <strong>{person.label}</strong>
            <div>{person.role}</div>
        </div>
    </div>
);

const OrgNodeComponent: React.FC<{ node: OrgNode }> = ({ node }) => {
    const isPerson = 'label' in node && 'role' in node;

    return (
        <>
            <div className={`org-node-container ${getContainerFormat(node.labelType || "")}`}>
                {(!node.role || isPerson) && (
                    <div className="org-node">

                        {!node.role && <div className={`${getTextFormat(node.labelType || "")}`}>{node.label}</div>}
                        {isPerson && <PersonNode person={node as OrgPerson} />}

                    </div>
                )}
                {'people' in node && node.people && (
                    <div className="children-group ">
                        {node.people.map((person, index) => (
                            <OrgNodeComponent key={index} node={person} />
                        ))}
                    </div>
                )}

                {'children' in node && node.children && (
                    <div className="children-group ">
                        {node.children.map((child, index) => (
                            <OrgNodeComponent key={index} node={child} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const OrgTree: React.FC<OrgChartProps> = ({ data }) => (
    <div className="org-chart-container">
        <OrgNodeComponent node={data} />
    </div>
);

export default OrgTree;


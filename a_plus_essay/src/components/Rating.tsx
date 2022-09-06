import React, { useState } from 'react'

import { Button, Center, FormControl, Input, Modal, Stack } from 'native-base';
import { AppIonIcon } from './Icon';

export default function Rating() {
    const [showModal, setShowModal] = useState(false);
    const [changeIcon, setChangeIcon] = useState(false)
    return <Center>
        {/* {changeIcon ? */}
            <Stack>
                <AppIonIcon name="heart-dislike" color='grey' size={18} onPress={() => setShowModal(true)} />
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Rate your Tutor</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Rating:</FormControl.Label>
                                <Input maxLength={1} keyboardType="numeric" />
                                <FormControl.HelperText _text={{
                                    fontSize: 'xs'
                                }}>
                                    **Maximum Rating: 5.0
                                </FormControl.HelperText>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button bgColor='#14b8a6' onPress={() => {
                                    setShowModal(false);
                                    setChangeIcon(true)
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Stack>
            {/* : null
        } */}
    </Center>
};

